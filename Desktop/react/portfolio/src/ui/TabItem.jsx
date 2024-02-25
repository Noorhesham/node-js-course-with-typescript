import { useTabs } from '../context/useTabs';

function TabItem({ children, id }) {
  const { activeTab, TabClick } = useTabs();
  return (
    <li
      onClick={() => TabClick(id)}
      className={` bg-opacity-0 text-sm sm:text-2xl lg:p-3 rounded-full transition-all duration-300 dark:hover:text-pink-300  capitalize  ${
        activeTab === id && ' bg-pink-600 dark:bg-pink-500 bg-opacity-95 '
      } `}
    >
      {children}
    </li>
  );
}
export default TabItem;
