import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { AdminNavMenu } from './AdminNavMenu';

export class AdminLayout extends Component {
    static displayName = AdminLayout.name;

    render() {
        return (
            <div>
                <AdminNavMenu />
                <Container tag="main">
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
