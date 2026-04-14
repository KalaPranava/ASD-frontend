# ASD Frontend

This project contains the frontend application for an Autism Spectrum Disorder (ASD) analysis platform. It features an interactive dashboard where a doctor can upload, run, and review AI-driven analyses on patient recordings.

## Features
- **Doctor Dashboard**: Intuitive platform to upload recordings, see analysis progress, and review past patient interaction history.
- **Patient Analytics Detail View**: Displays cumulative insights and historical results grouped chronologically per patient.
- **Reporting**: Ability to export a mock PDF report outlining an EEG's specific detected details.
- **Patient Dashboard (Coming Soon)**: A separate interface meant directly for the patient providing a simplified view of their neural report overview.

## Tech Stack
- [Next.js](https://nextjs.org) (v16.2.1)
- React 19
- React ChartJS 2 (Chart.js wrapper)
- jsPDF (for client-side reporting)
- Tailwind CSS v4

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Status
This repository functions as the `frontend` interface. It operates using mock data blocks (`DashboardClient.tsx`, `ResultsView.tsx`) to illustrate the UI state flow of an active patient recording being analyzed by a mock AI detection service.
  
