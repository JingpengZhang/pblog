import Icon from "@/app/ui/common/icon";
import Image from "next/image";
import Link from "next/link";
import DefaultCover from "~/common/default-cover.jpg";

export default function Page() {
  const toc = [
    {
      id: 1,
      level: 1,
      name: "概述",
    },
    {
      id: 2,
      level: 1,
      name: "一、开发技术与环境配置",
    },
    {
      id: 3,
      level: 1,
      name: "1.1 SpringBoot框架",
    },
    {
      id: 4,
      level: 1,
      name: "1.2 Java语言简介",
    },
  ];

  return (
    <section>
      <div className="w-full h-[600px] border-b border-[#222] relative">
        <Image
          src={DefaultCover}
          alt="封面"
          className="w-full h-full object-cover"
        />
        <div className="h-full w-full absolute top-0 left-0 bg-gradient-to-b from-[transparent] to-[#141414] flex items-end">
          <div className="w-full py-12 sticky top-20">
            <p className="text-white text-4xl text-center">
              Spring Boot后端与Vue前端融合：构建高效旅游管理系统
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex border-b border-[#222]">
        <div className="flex-grow">
          {/* 简介 */}
          <div className="py-20 px-32 border-b border-[#222]">
            <span className="text-white text-lg">概述</span>
            <p className="text-[#98989A] text-sm mt-4 leading-6">
              在旅游网站的初期开发阶段，我国许多网站存在一些普遍问题。其中之一是缺乏对旅游行业和网络运营的全面了解，这导致他们无法准确找到自己的切入点，这种情况导致了一系列问题。首先，设计相似、内容雷同，缺乏创新和差异化，无法吸引用户的兴趣和留存。因此，在开发旅游网站时，我们需要深入了解旅游行业和网络运营，以全面了解市场需求和用户喜好。此外，我们还应重视建立规模化的经营模式，通过有效的网上促销和预订机制提高成功率，以实现更可观的旅游电子商务销售额。
            </p>

            <p className="text-[#98989A] text-sm mt-4 leading-6">
              旅游网站面临着旅游产品交易安全性的瓶颈。然而，大多数国内旅游网站的在线支付手段不完善，缺乏统一的标准体系，交易安全性令人担忧。恶意订购和交易错误频繁发生，导致消费者对在线交易的信任度不高。解决这个问题的关键是建立健全的支付体系，加强身份验证和数据加密，以及建立完善的客服和投诉处理机制，提高交易的安全性和用户的信任度。因此，交易不安全问题成为旅游网站发展中最大的障碍之一。
            </p>

            <p className="text-[#98989A] text-sm mt-4 leading-6">
              为了改善这种情况，旅游网站应采取以下措施：首先，加强自身的知名度和美誉度，通过积极的网络营销活动提高曝光率。其次，建立可靠的信誉体系，确保网站的信誉度、安全性和可信度，从而增加用户对网站的信任。同时，制定科学的管理和运营标准，规范网站的运作，并引导用户在网站上进行安全、可靠的交易。此外，还应加强对网站内容的引导和规范，确保内容的真实性和合法性。最后，积极推进运行制度的建设，提高网站的质量和安全性，并通过广告宣传扩大网站的影响力。通过这些措施，旅游网站能够提升整体质量和安全性，增强用户对网站的信任，进而促进业务发展。
            </p>
          </div>
          <div className="py-20 px-32 text-[#98989A]">
            <h1 className="text-white text-lg">一、开发技术与环境配置</h1>
            <p className="mt-4 text-sm">
              以Java语言为开发工具，利用了当前先进的springboot框架，以IDEA为系统开发工具，MySQL为后台数据库，vue为后台管理页面开发的一个旅游管理系统。
            </p>

            <p className="text-white text-lg mt-4">1.1 SpringBoot框架</p>

            <p className="mt-4 text-sm leading-6">
              SpringBoot是一个全新开源的轻量级框架。基于Spring4.0设计，其不仅继承了Spring框架原来有的优秀特性，而且还通过简化配置文件来进一步简化了Spring应用的整个搭建以及开发过程。另外在原本的Spring中由于随着项目的扩大导入的jar包数量越来越大，随之出现了jar包版本之间的兼容性问题，而此时SpringBoot通过集成大量的框架使得依赖包的版本冲突，以及引用的不稳定性问题得到了很好的解决。
            </p>

            <p className="mt-4 text-sm leading-6">
              SpringBoot可以看做是Spring的加强版本，但实质上都是Spring的相关技术，有了这些优秀的开源框架，程序员在开发过程中将事半功倍。
            </p>

            <p className="text-white text-lg mt-4">1.2 Java语言简介</p>

            <p className="mt-4 text-sm leading-6">
              Java是由SUN公司推出，该公司于2010年被oracle公司收购。Java本是印度尼西亚的一个叫做爪洼岛的英文名称，也因此得来java是一杯正冒着热气咖啡的标识。Java语言在移动互联网的大背景下具备了显著的优势和广阔的前景，它是面向对象的，分布式的，动态的，具有平台无关性、安全性、健壮性。Java语言的基本语句语法和C++一样，但是它面向对象的技术更加彻底，因为Java要求将所有的内容都必须封装成类，把类作为程序的基本单位。由于不允许类外有变量、方法。
              Java语言的分布式体现在数据分布和操作分布，它是面向网络的语言，可以处理TCP/IP协议，它也支持客户机/服务器的计算模式。Java语言的动态性是指类在运行时是动态安装的，使得Java可以动态的维护程序。Java不支持指针，对内存访问的所有操作都是通过对象实例化实现的，这样就避免了指针操作中易产生的错误，同时也预防了病毒对系统的破坏和威胁。
            </p>

            <p className="mt-4 text-sm leading-6">
              Java语言的编程风格与C语言非常接近，它继承了C++面向对象技术的核心，它面世之后发展迅速，非常流行，对高级C语言形成了很大的冲击。业内人士称之为“一次编译、到处执行”。当然java也有缺点，在每次执行编译后，字节码都需要消耗一定的时间，在某些程度上降低了性能。但是这并不影响java成为此次设计语言的选择。Java语言简单易学，使用它的编程时间短，功能性强，开发者学习起来更简便、更快。Java的主要特性有以下几个：
            </p>
          </div>
        </div>
        <div className="w-[35%] flex-shrink-0 border-l border-[#222]">
          <div className="text-white px-16 py-12 border-b border-[#222] pr-32 flex items-center">
            <ul className="flex gap-x-4">
              <li>
                <button className=" rounded-full border border-[#222]  text-sm px-5 h-10 text-[#98989A] flex items-center">
                  <Icon
                    name="heart"
                    type="outline"
                    color="#666666"
                    size={18}
                    className="mr-2"
                  />
                  12.4k
                </button>
              </li>
              <li>
                <button className=" rounded-full border border-[#222]  text-sm px-5 h-10 text-[#98989A] flex items-center">
                  <Icon
                    name="eye"
                    type="outline"
                    color="#666666"
                    size={18}
                    className="mr-2"
                  />
                  50k
                </button>
              </li>
              <li>
                <button className=" rounded-full border border-[#222]  text-sm px-5 h-10 text-[#98989A] flex items-center">
                  <Icon
                    name="share"
                    type="outline"
                    color="#666666"
                    size={18}
                    className="mr-2"
                  />
                  分享
                </button>
              </li>
            </ul>
          </div>
          <div className="p-16 pr-32">
            <ul className="grid grid-cols-2 gap-y-10 text-sm">
              <li>
                <span className="text-[#98989A]">发布日期</span>
                <p className="mt-4 text-white">2024/04/27</p>
              </li>

              <li>
                <span className="text-[#98989A]">所属分类</span>
                <p className="mt-4 text-white">Healthcare</p>
              </li>

              <li>
                <span className="text-[#98989A]">阅读时长</span>
                <p className="mt-4 text-white">10 Min</p>
              </li>

              <li>
                <span className="text-[#98989A]">作者</span>
                <p className="mt-4 text-white">Dr. Emily Walker</p>
              </li>

              <li className="col-span-2 sticky top-20">
                <span className="text-[#98989A]">目录</span>
                <div className="mt-4 w-full bg-[#191919] rounded-[12px] py-2 px-10">
                  <ul className="text-white gap-2 list-disc pl-2">
                    {toc.map((toc) => (
                      <li key={toc.id} className="cursor-pointer my-4 text-sm">
                        {toc.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="py-20 px-32">
        <div className="w-full flex items-center justify-between">
          <span className="text-[#CCCCCC] text-xl">Similar News</span>
          <Link
            href=""
            className="h-[50px] px-4 text-[#98989A] text-sm border border-[#262626] rounded-[12px] flex items-center justify-center"
          >
            View All News
            <Icon name="link" color="#FFD11A" size={20} className="ml-2" />
          </Link>
        </div>

        <div className="mt-10">
          <ul className="grid grid-cols-4 gap-10">
            {[1, 2, 3, 4].map((article) => (
              <li key={article} className="flex flex-col justify-between">
                <div>
                  <div className="w-full rounded-[12px] overflow-hidden aspect-video">
                    <Image
                      src={DefaultCover}
                      alt="封面"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <Link href="" className="line-clamp-1 mt-4 text-white">
                    A Decisive Victory for Progressive Policies
                  </Link>

                  <div className="mt-2">
                    <Link href="" className="text-sm text-[#98989A]">
                      Politics
                    </Link>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href=""
                    className="h-[50px] px-4 text-[#98989A] text-sm border border-[#262626] rounded-[12px] flex items-center justify-center"
                  >
                    Read More
                    <Icon
                      name="link"
                      color="#FFD11A"
                      size={20}
                      className="ml-2"
                    />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
