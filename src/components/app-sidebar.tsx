'use client'

import * as React from "react"
import { GalleryVerticalEnd, ChevronDown } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "~/components/ui/sidebar"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Business Center",
      url: "#",
      items: [
        {
          title: "Overview",
          url: "#",
        },
        {
          title: "Analytics",
          url: "#",
        },
        {
          title: "Reports",
          url: "#",
        },
      ],
    },
    {
      title: "Creatives",
      url: "#",
      items: [
        {
          title: "Ad Library",
          url: "#",
        },
        {
          title: "Creative Hub",
          url: "#",
        },
        {
          title: "Templates",
          url: "#",
        },
      ],
    },
    {
      title: "Catalog",
      url: "#",
      items: [
        {
          title: "Products",
          url: "#",
        },
        {
          title: "Collections",
          url: "#",
        },
        {
          title: "Categories",
          url: "#",
        },
      ],
    },
    {
      title: "Campaign Management",
      url: "#",
      items: [
        {
          title: "Campaigns",
          url: "#",
        },
        {
          title: "Ad Groups",
          url: "#",
        },
        {
          title: "Ads",
          url: "#",
        },
        {
          title: "Audiences",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({});

  const toggleItem = (title: string) => {
    setOpenItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">TikTok Ads</span>
                  <span className="">Dashboard</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild 
                  onClick={() => toggleItem(item.title)}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium">{item.title}</span>
                    <ChevronDown 
                      className={`size-4 transition-transform ${openItems[item.title] ? 'rotate-180' : ''}`}
                    />
                  </div>
                </SidebarMenuButton>
                {item.items?.length && openItems[item.title] ? (
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>{subItem.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
