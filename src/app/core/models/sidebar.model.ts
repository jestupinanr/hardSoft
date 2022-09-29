export interface SideBarModel {
  name: string,
  open: boolean,
  icon: string,
  children: ChildrenSideBar[]
};

interface ChildrenSideBar {
  name: string,
  url?: string
}
