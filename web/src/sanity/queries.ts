import { defineQuery } from 'groq';
import type { PortableTextBlock } from '@portabletext/types';
import { sanityClient } from 'sanity:client';

export interface Slug {
  current: string;
}

export interface SanityImage {
  asset: {
    _id: string;
    url: string;
    metadata: {
      lqip: string | null;
      dimensions: { width: number; height: number };
    };
  };
  alt: string | null;
}

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)] | order(name asc) {
    _id,
    name,
    slug,
    featuredImage{
      asset->{ _id, url, metadata { lqip, dimensions { width, height } } },
      alt
    }
  }
`);

export interface ProjectListItem {
  _id: string;
  name: string;
  slug: Slug;
  featuredImage: SanityImage | null;
}

export async function getProjects(): Promise<ProjectListItem[]> {
  return sanityClient.fetch<ProjectListItem[]>(PROJECTS_QUERY);
}

export const PROJECT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    featuredImage{
      asset->{ _id, url, metadata { lqip, dimensions { width, height } } },
      alt
    },
    description,
    gallery[]{
      _key,
      asset->{ _id, url, metadata { lqip, dimensions { width, height } } },
      alt
    }
  }
`);

export interface Project {
  _id: string;
  name: string;
  slug: Slug;
  featuredImage: SanityImage | null;
  description: PortableTextBlock[];
  gallery: (SanityImage & { _key: string })[];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return sanityClient.fetch<Project | null>(PROJECT_BY_SLUG_QUERY, { slug });
}

export const SETTINGS_QUERY = defineQuery(`
  *[_id == "settings"][0]{
    "title": coalesce(seoTitle, siteTitle, ""),
    "description": coalesce(seoDescription, ""),
    ogImage{
      asset->{ _id, url, metadata { lqip, dimensions { width, height } } },
      alt
    }
  }
`);

export interface SiteSettings {
  title: string;
  description: string;
  ogImage: SanityImage | null;
}

export async function getSettings(): Promise<SiteSettings | null> {
  return sanityClient.fetch<SiteSettings | null>(SETTINGS_QUERY);
}
