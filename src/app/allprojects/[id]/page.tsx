import { redirect } from 'next/navigation';
import { projectsData } from '@/data/projects';

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id,
  }));
}

export default function SingleProjectRedirect({ params }: { params: { id: string } }) {
  redirect(`/allproject/${params.id}`);
}
