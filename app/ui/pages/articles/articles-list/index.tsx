"use client";

import Icon from "@/app/ui/common/icon";
import Link from "next/link";
import { useState } from "react";

const ListItem = () => {
  return (
    <div className="py-14 flex items-center justify-between w-page mx-auto">
      <div className="h-[150px] flex flex-col justify-between">
        <div>
          <span className="text-[#98989A]">2024/04/27</span>
          <Link
            href="/articles/test"
            className=" block text-white text-xl mt-8 line-clamp-1 break-all"
          >
            Tech Giants Announce New Product Line
          </Link>
          <p className="text-[#98989A] mt-3 line-clamp-2 break-all">
            Explore the latest innovations from tech industry leaders, unveiling
            new products that promise to transform the digital landscape
          </p>
        </div>
        <div></div>
      </div>

      <button className="h-[50px] w-[150px] text-[#98989A] text-sm border border-[#262626] rounded-[12px] flex items-center justify-center">
        Read More
        <Icon name="link" color="#FFD11A" size={20} className="ml-2" />
      </button>
    </div>
  );
};

const ArticlesList = () => {
  const types = [
    {
      id: 1,
      name: "All",
    },

    {
      id: 2,
      name: "Politics",
    },

    {
      id: 3,
      name: "Technology",
    },

    {
      id: 4,
      name: "Health",
    },

    {
      id: 5,
      name: "Environment",
    },

    {
      id: 6,
      name: "Sports",
    },
  ];

  const [currentTypeId, setCurrentTypeId] = useState(1);

  return (
    <div className="w-full">
      <div className="sticky w-full top-20 bg-[#141414] border-b border-[#222] text-sm">
        <ul className="w-page mx-auto py-12 flex flex-wrap gap-4">
          {types.map((type) => (
            <li
              key={type.id}
              className={[
                " h-12 flex items-center justify-center border border-[#222] rounded-[8px] px-8 cursor-pointer",
                type.id === currentTypeId
                  ? "text-white bg-[#191919]"
                  : "text-[#98989A]",
              ].join(" ")}
            >
              {type.name}
            </li>
          ))}
        </ul>
      </div>
      <ul className="w-full">
        {[1, 2, 3, 4, 5].map((article) => (
          <li key={article} className="w-full border-b border-[#222]">
            <ListItem />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticlesList;
