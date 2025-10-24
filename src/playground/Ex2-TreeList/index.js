import TreeListComponent from './TreeList';
import TreeListSolvedComponent from './solved/TreeListSolved';
import { withErrorBoundary } from './withErrorBoundary';
import Checkpoints from './Checkpoints';

// Wrap TreeList with error boundary to ensure Checkpoints always render
const TreeList = withErrorBoundary(TreeListComponent, Checkpoints);
const TreeListSolved = withErrorBoundary(TreeListSolvedComponent, Checkpoints);

export default TreeList;
export { TreeListSolved as solved };
