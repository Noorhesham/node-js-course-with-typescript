# Tabib Web App

### Overview

The **Tabib Web App** is a Next.js TypeScript project designed to simplify the process for patients to find and book doctors. It also allows doctors to manage their clinics and appointments through an intuitive dashboard. The application leverages modern technologies such as **Tailwind CSS** for styling, **GSAP** and **Framer Motion** for animations, and **Next.js Server Components** with **TanStack Query** for data fetching.

---

## Features

### Patient Features

- Browse available doctors by specialties.
- Filter doctors based on location and specialty.
- View detailed doctor profiles, including ratings and available time slots.
- Book appointments with doctors directly.

### Doctor Features

- Personalized dashboard for managing appointments and clinics.
- Ability to manage available time slots and clinic information.
- View and manage upcoming appointments and bookings.
- Update profile information in real-time.

---

## Tech Stack

- **Framework**: Next.js (TypeScript)
- **Styling**: Tailwind CSS
- **Animations**: GSAP, Framer Motion, Locomotive Scroll
- **Data Fetching**: Next.js Server Components, TanStack Query

---

## User Interface & Design

### Key Pages

- **Home Page**: Introduces the service and offers search/filter functionality for finding doctors based on location and specialty.
- **Doctor List**: Displays a list of doctors based on search criteria. Each card contains key information, such as specialties, clinic locations, and available appointment times.
- **Doctor Profile**: Patients can access detailed profiles of doctors, including bios, ratings, and available time slots for booking appointments.
- **Booking Page**: Allows patients to select from a doctor's available appointment slots and confirm their booking.
- **Doctor Dashboard**: Doctors can manage their schedule, view patient bookings, and update profile or clinic details.

---

## Animations

The application enhances the user experience with smooth, engaging animations using:

- **GSAP (GreenSock Animation Platform)**: Powers complex animations like page transitions and element fade-ins, notably on the doctor dashboard and booking confirmation pages.
- **Framer Motion**: Animates UI components such as doctor cards and modal windows for booking confirmations.
- **Locomotive Scroll**: Adds parallax scrolling effects, particularly enhancing the landing page for a more immersive feel.

---

## Data Fetching

- **Server-Side Data Fetching (Next.js)**: Doctor profiles, appointment slots, and clinic details are fetched server-side, ensuring that data is pre-fetched for faster page load times.
- **Client-Side Data Fetching (TanStack Query)**: Operations such as booking appointments and updating doctor availability are handled client-side. TanStack Query ensures real-time data synchronization and caching for efficient UI updates.

  ### Key Client-Side Operations

  - Fetching real-time appointment slots.
  - Submitting and confirming patient bookings.
  - Updating doctor availability in the dashboard.

---

## Additional Features

- **Responsive Design**: The app is fully responsive, ensuring an optimal user experience on both desktop and mobile devices.
- **Accessibility**: Includes features such as keyboard navigation, appropriate color contrast, and screen reader support to improve usability for all users.
- **Form Validation**: Ensures smooth user experiences through both client-side and server-side validation of booking forms and other inputs.

---

## Conclusion

The **Tabib Web App** is a modern, scalable solution for managing doctor appointments and clinic schedules. It provides a seamless experience for both patients and doctors with features like real-time booking, smooth animations, and a clean, responsive design. The use of Next.js, Tailwind CSS, GSAP, and TanStack Query ensures a high-performance, maintainable codebase that is easy to extend and scale.

---
