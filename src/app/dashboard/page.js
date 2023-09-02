import UserInfo from "@/components/UserInfo";
import LogOut from '@/components/LogOut'
import styles from '@/styles/app.module.css'

export default function Dashboard() {
    return (
        <div>
            <UserInfo />
            <LogOut />
        </div>
    )

}