/**
 *
 * Asynchronously loads the Directory Page
 *
 */

import loadable from '../../utils/loadable';

export default loadable(() => import('./index'));
