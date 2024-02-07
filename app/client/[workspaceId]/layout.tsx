import AddPeopleModal from "@/app/components/Modals/AddPeopleModal"
import Modal from "@/app/components/Modals/Modal"
import SideNavbar from "@/app/components/navbars/SideNavbar"
import TopNavbar from "@/app/components/navbars/TopNavbar"
import { ThemeProvider } from "@/app/theme-provider"

export default function ClientLayout({children}: { children: React.ReactNode}) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <section>
                <Modal />
                <AddPeopleModal />
                <TopNavbar />
                <div className="">
                    <SideNavbar />
                    <div className="pl-[20vw]">{children}</div>
                </div>
            </section>
        </ThemeProvider>
    )
}