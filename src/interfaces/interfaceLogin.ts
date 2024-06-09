import { ReactNode } from 'react';

export interface FormValues {
    email: string;
    password: string;
  }

export interface RequireAuthProps {
    children: ReactNode;
  }