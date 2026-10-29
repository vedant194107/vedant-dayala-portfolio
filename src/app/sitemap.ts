import { MetadataRoute } from 'next';
import { projectsData } from '@/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vedantdayala.dev';

  const projectRoutes: MetadataRoute.Sitemap = projectsData.map((project) => ({
    url: `${baseUrl}/allproject/${project.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/allproject`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/lab`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...projectRoutes,
  ];
}
