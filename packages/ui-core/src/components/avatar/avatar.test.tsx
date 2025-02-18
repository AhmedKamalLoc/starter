import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Avatar } from './avatar';

describe('Avatar Component', () => {
  const props = {
    src: 'https://picsum.photos/200',
    alt: 'User Avatar',
  };

  it('renders the fallback text when src is provided but image is not loaded', async () => {
    render(<Avatar {...props} />);

    // Wait for the fallback text to appear
    const fallback = await screen.findByText('Us'); // First two characters of alt
    expect(fallback).toBeInTheDocument();
  });

  it('renders the fallback text when src is not provided', () => {
    render(<Avatar src="" alt="John Doe" />);
    const fallback = screen.getByText('Jo'); // First two characters of alt
    expect(fallback).toBeInTheDocument();
  });

  it('renders the fallback text when src is invalid', () => {
    render(<Avatar src="invalid-url" alt="Jane Doe" />);
    const fallback = screen.getByText('Ja'); // First two characters of alt
    expect(fallback).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(<Avatar {...props} className="custom-class" />);
    const avatar = screen.getByText('Us').closest('div'); // Fallback text

    expect(avatar?.firstChild).toHaveClass('custom-class');
  });

  it('renders the first two characters of the alt text as fallback', () => {
    render(<Avatar src="" alt="Alexander The Great" />);
    const fallback = screen.getByText('Al'); // First two characters of alt
    expect(fallback).toBeInTheDocument();
  });
});
