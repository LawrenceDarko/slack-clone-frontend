'use client'

import WorkspacesCard from "@/app/components/cards/WorkspacesCard";
import { useGeneralContext } from "@/app/context/GeneralContext";

const WorkspacesPage = () => {
  const { setShowWorkspaceModal, showWorkspaceModal } = useGeneralContext();
  

  return (
    <div className="w-full h-full">
      <div className="relative w-full flex flex-col h-full pb-20 bg-[#F9F6F1] md:px-6 lg:px-12 xl:px-48 justify-center items-center">
        <div className="w-40 h-16 mb-20">
          <img src="/images/logo.png" className="object-contain" alt="Logo" />
        </div>
        <div className="flex items-center justify-center w-[65%] gap-5 md:flex-row">
          <div className="w-full md:w-[70%] flex flex-col gap-4">
            <h1 className="font-semibold text-[2.5vw] leading-[2.4vw] md:text-left">Create a new Slack workspace</h1>
            <p className="text-[1vw] md:text-left">Slack gives your team a home — a place where they can talk and work together. To create a new workspace, click the button below.</p>
            <button
              // onClick={handleFormSubmit}
              type="submit"
              className="cursor-pointer flex rounded-md text-white bg-[#611F69] justify-center items-center h-12 w-full"
            >
              <p onClick={()=>setShowWorkspaceModal(true)} className="whitespace-nowrap text-[1vw]">Create a Workspace</p>
            </button>
            <div className="flex items-start gap-2">
              <input type="checkbox"/>
              <p className="text-[0.7vw] text-[#616061]">It’s okay to send me marketing communications about Salesforce, including Slack. I can unsubscribe at any time.</p>
            </div>
            <p className="text-[0.8vw] text-[#616061] mt-1">By continuing, you’re agreeing to our Main Services Agreement, User Terms of Service, Privacy Policy, Cookie Policy and Slack Supplemental Terms.</p>
          </div>
          <div className="">
            <img src="/images/workspaceimg.png" alt="Workspace"/>
          </div>
          <div className="absolute -bottom-[30px] left-[47.5%] rounded-full bg-white p-6">OR</div>
        </div>
      </div>
      <div className="flex w-full flex-col pt-[35px] items-center justify-center"> 
        <div className="flex items-center">
          <p className="font-bold">Open a workspace</p>
        </div>
        <div className="flex justify-center w-full p-4 pb-20">
          <WorkspacesCard modalState={showWorkspaceModal}/>
        </div>
        
      </div>
    </div>
  )
}

export default WorkspacesPage


{/* <div className="w-full h-full">
<div className="w-full flex h-[83vh] bg-[#F9F6F1] md:px-48 justify-center items-center">
  <div className="flex items-center justify-center w-[70%] gap-5">
    <div className="border w-[70%] flex flex-col gap-4">
      <h1 className="text-[50px] leading-[55px] font-semibold">Create a new Slack workspace</h1>
      <p className="">Slack gives your team a home — a place where they can talk and work together. To create a new workspace, click the button below.</p>
      <button
        // onClick={handleFormSubmit}
        type="submit"
        className="cursor-pointer flex rounded-md text-white bg-[#611F69] justify-center items-center h-12 w-full"
      >
        Create a Workspace
      </button>
      <div className="flex items-start gap-2">
        <input type="checkbox"/>
        <p className="text-[11px] text-[#616061]">It’s okay to send me marketing communications about Salesforce, including Slack. I can unsubscribe at any time.</p>
      </div>

      <p className="text-[12px] text-[#616061]">By continuing, you’re agreeing to our Main Services Agreement, User Terms of Service, Privacy Policy, Cookie Policy and Slack Supplemental Terms.</p>
      
    </div>
    <div className="border">
      <img src="/images/workspaceimg.png"/>
    </div>
  </div>
</div>
</div> */}