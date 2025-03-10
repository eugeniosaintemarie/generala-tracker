"use client"

import { useState } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const baseUrl = 'https://eugeniosaintemarie.github.io/';

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