import { useEffect, useState } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [baseUrl, setBaseUrl] = useState('/');

  useEffect(() => {
    const fetchBaseUrl = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/eugeniosaintemarie/config-central/gh-pages/url.json');
        if (response.ok) {
          const data = await response.json();
          if (data && data.baseURL) {
            setBaseUrl(data.baseURL);
          }
        }
      } catch (error) {
        console.error('Error fetching base URL:', error);
      }
    };

    fetchBaseUrl();
  }, []);

  return (
    <footer className="bg-background text-muted-foreground p-4 mt-auto">
      <div className="container mx-auto">
        <p className="text-center">
          <a href={baseUrl} className="hover:text-foreground transition-colors">
            ∃ugenio © {currentYear}
          </a>
        </p>
      </div>
    </footer>
  )
}