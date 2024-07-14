import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminDashboard from '../pages/admin/AdminDashboard';

describe('AdminDashboard Component', () => {
    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Router>
                <AdminDashboard />
            </Router>
        );
    });

    it('renders admin dashboard title', () => {
        const titleElement = screen.getByText(/Admin Dashboard/i);
        expect(titleElement).toBeInTheDocument();
    });

    it('renders menu icon initially', () => {
        const menuIconElement = screen.getByLabelText('open drawer');
        expect(menuIconElement).toBeInTheDocument();
    });

    it('toggles drawer visibility on menu icon click', () => {
        const menuIconElement = screen.getByLabelText('open drawer');
        menuIconElement.click();

        const closeButtonElement = screen.getByLabelText('close drawer');
        expect(closeButtonElement).toBeInTheDocument();
    });

    it('renders sidebar links', () => {
        const sidebarLinkElement = screen.getByText(/Profile/i);
        expect(sidebarLinkElement).toBeInTheDocument();
    });

    // Add more specific tests for other routes and functionality

    it('renders logout link', () => {
        const logoutLinkElement = screen.getByText(/Logout/i);
        expect(logoutLinkElement).toBeInTheDocument();
    });
});
