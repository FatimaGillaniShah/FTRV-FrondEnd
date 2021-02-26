/**
 *
 * Asynchronously loads the directory Page
 *
 */

import loadable from '../../utils/loadable';

export default loadable(() => import('./index'));
