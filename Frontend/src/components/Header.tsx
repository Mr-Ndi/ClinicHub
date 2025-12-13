// src/components/Header.tsx
import React from 'react';
import { Button } from '@shadcn/ui';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-semibold">ClinicHub</h1>
        <nav>
          <Button variant="outline" className="mr-4">About</Button>
          <Button variant="outline" className="mr-4">Services</Button>
          <Button variant="outline" className="mr-4">Contact</Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

