import Header from "../admin/User/header"
import UserCard from "../admin/User/user_card"

export default function User(){
    return(
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header />
        <UserCard />
    </div>
    )
}