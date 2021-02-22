/**
 *
 * Asynchronously loads the component for DirectoryUploader
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
