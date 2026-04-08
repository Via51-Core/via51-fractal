import React, { useEffect, useState } from 'react';
import PublicFeed from '@alfa/views/PublicFeed';
import AdminControl from '@alfa/views/AdminControl';
import PortalHub from '@beta/components/layout/PortalHub';

const NodeSwitcher: React.FC = () => {
    const [nodeType, setNodeType] = useState<'ALFA' | 'BETA' | 'GAMMA' | 'LOADING'>('LOADING');

    useEffect(() => {
        const host = window.location.hostname;

        if (host.includes('gamma.')) {
            setNodeType('GAMMA'); // Cerebro / Control Total
        } else if (host.includes('hub.')) {
            setNodeType('BETA');  // Tráfico / Portal de Sectores
        } else {
            setNodeType('ALFA');  // Captura / Feed Público
        }
    }, []);

    if (nodeType === 'LOADING') return <div className="bg-black h-screen" />;

    return (
        <div className="v51-sovereign-context">
            {nodeType === 'GAMMA' && <AdminControl />}
            {nodeType === 'BETA' && <PortalHub />}
            {nodeType === 'ALFA' && <PublicFeed />}
        </div>
    );
};

export default NodeSwitcher;