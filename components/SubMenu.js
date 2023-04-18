import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const SubMenu = ({ items }) => {
  return (
    <ul className="bg-gray-100 rounded-lg py-2 px-3">
      {items.map((item) => (
        <li key={item.label} className="my-2">
          <Link href={item.href}>
            <a className="flex items-center">
              <span className="mr-2">{item.label}</span>
              <FontAwesomeIcon icon={faAngleRight} />
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SubMenu;
