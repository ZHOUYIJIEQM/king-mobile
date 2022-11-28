/**
 * keep-alive页面, 切换时回到原来的滚动高度
 */
export function saveScrollH() {
  let pageY = 0;
  const getPageY = () => {
    return (
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      window.pageYOffset
    );
  };
  onActivated(() => {
    window.scrollTo(0, pageY);
  });
  onBeforeRouteLeave(() => {
    pageY = getPageY();
  });
}
