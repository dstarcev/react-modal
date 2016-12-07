/*!
 * Adapted from jQuery UI core
 *
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */

 function focusable (element, isTabIndexNotNaN) {
   const nodeName = element.nodeName.toLowerCase();
   const isFocusableLink = nodeName === 'a' ?
     element.href || isTabIndexNotNaN : isTabIndexNotNaN;
   if (isFocusableLink) {
     return true;
   }

   return /input|select|textarea|button|object/.test(nodeName)
     && !element.disabled
     && visible(element);
 }

 function hidesContents(el) {
   return (
     el.offsetWidth <= 0
     && el.offsetHeight <= 0
     // If the node is empty, the above is good enough. Otherwise check the node's overflow property.
     && !(el.innerHTML && window.getComputedStyle(el).getPropertyValue('overflow') === 'visible')
   ) || el.style.display === 'none';
 }

 function visible(element) {
   while (element) {
     if (element === document.body) break;
     if (hidesContents(element)) return false;
     element = element.parentNode;
   }
   return true;
 }

 function tabbable (element) {
   let tabIndex = element.getAttribute('tabindex');
   if (tabIndex === null) tabIndex = undefined;
   const isTabIndexNaN = isNaN(tabIndex);
   return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
 }

 function findTabbableDescendants (element) {
   return [].slice.call(element.querySelectorAll('*'), 0).filter(el => tabbable(el));
 }

 export default findTabbableDescendants;
