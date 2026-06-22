import UserNav from "./user-nav";

export default function Navbar(){
    return (
        <header className="sticky top-0 z-0 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
            <div className="mx-4 sm:mx-8 flex h-14 items-center justify-end ">
                <div>
                    <UserNav />
                </div>
                
            </div>
        </header>
    )
}