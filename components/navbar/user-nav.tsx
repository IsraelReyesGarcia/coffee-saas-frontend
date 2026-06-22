import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function UserNav(){
    return(
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
                <Button
                    variant={'outline'}
                    className="relative rounded-full h-8 w-8 "
                >
                    
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}