import { RegistryNode, TreeNode } from '../types/fractal';

export const buildFractalTree = (nodes: fractal';
import { Shield, LayoutGrid, Users, Activity } from 'lucide-react';

const FractalMap: React.FC = () => {
    const [nodes, setNodes] = useState<HoldingNode[]>([]);
    const [loading, setLoading] = useState(true);

    // 1. Captura de la estructura desde el HUB (Beta)
    useEffect(() => {
        const fetchStructure = async () => {
            const { data, error } = await supabase
                .from('sys_registry')
                .select('*')
                .order('node_path', { ascending: true });

            if (data) {
                // Transformamos la lista plana en un árbol jerárquico
                setNodes(data);
            }
            setLoading(false);
        };
        RegistryNode[]): TreeNode[] => {
    const map: Record<string, TreeNode> = {};
    const roots: TreeNode[] = [];

    nodes.forEach(node => {
        map[node.node_path] = { ...node, children: [] };
    });

    nodes.forEach(node => {
        const parts = node.node_path.split('.');
        if (parts.length === 1) {
            roots.push(map[node.node_path]);
        } else {
            const parentPath = parts.slice(0, -1).join('.');
            if (map[parentPath]) {
                map[parentPath].children.push(map[node.node_path]);
            }
        }
    });

    return roots;
};