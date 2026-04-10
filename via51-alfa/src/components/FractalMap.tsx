import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient'; // Cliente agnóstico
import { HoldingNode } from '../types/name: string;
node_path: string; // Ejemplo: 'root.pol.t1'
level: number;     // 0 a 3
owner_id: string;
}

export interface TreeNode extends RegistryNode {
    children: TreeNode[];
}