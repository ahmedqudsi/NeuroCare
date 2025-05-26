
import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirect to the main dashboard (non-localized)
  redirect('/dashboard');
}
