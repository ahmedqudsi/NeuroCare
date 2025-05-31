
// import { redirect } from 'next/navigation'; // Temporarily comment out redirect

export default function HomePage() {
  // redirect('/dashboard'); // Temporarily comment out redirect
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Welcome to NeuroCare</h1>
      <p>If you see this, the root page is attempting to render.</p>
      <p>The server logs indicate it started successfully. If this page is stuck loading, there might be an issue with the root layout or global styles.</p>
      <a href="/dashboard" style={{ display: 'inline-block', marginTop: '20px', padding: '10px 15px', backgroundColor: '#64B5F6', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
        Go to Dashboard Manually
      </a>
    </div>
  );
}
