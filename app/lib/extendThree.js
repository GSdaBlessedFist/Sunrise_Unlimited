import { extend } from '@react-three/fiber';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { Mesh, ShapeGeometry, MeshBasicMaterial } from 'three';

// Extend the THREE namespace with SVGLoader and other required components
class Svg extends Mesh {}
extend({ Svg, SVGLoader, ShapeGeometry, MeshBasicMaterial });
