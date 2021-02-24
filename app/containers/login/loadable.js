/**
 *
 * Asynchronously loads the Login Container
 *
 */

import loadable from '../../utils/loadable';

export default loadable(() => import('./index'));
