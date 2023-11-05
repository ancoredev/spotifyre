import Header from "@/components/Header"
import AccountContent from "./components/AccountContent"

const Account = ({}) => {
  return (
  <div className="
    bg-neutral-900
    rounded-lg
    h-full
    w-full
    overflow-hidden
    overflow-y-auto
  ">
    <Header className="from-bg-neutral-900">
      <div className="mb-2 flx flex-col gap-y-6">
        <h1 className="text-white text-3xl font-semibold">
          Account Settings (in dev)
        </h1> 
        <AccountContent />
      </div>
    </Header>
  </div>
  )
}

export default Account