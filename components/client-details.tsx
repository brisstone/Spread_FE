import { Props } from "@/types/props";
import { BaseHDivider } from "./divider";
import Glass from "./glass";
import Image from "next/image";
import Tag from "./tag";
import { MinimalUser } from "@/types/general";
import { getUserName } from "@/lib/util";
import utilStyles from "@/styles/utils.module.css";
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, Key, useState } from "react";
import { AiOutlineEdit } from 'react-icons/ai';
import EditOnBoardingAnswer from "./onboarding/edit-onbarding-answer-modal";

interface ClientDetailGlassProps extends Props {
  title: string;
}

interface NoteGlassProps extends ClientDetailGlassProps {
  note: string;
  lead: any;
}


interface Item {
  answer: string;
  category: string;
  question: string;
  id: string;
}

function ClientDetailGlass(props: ClientDetailGlassProps) {

  return (
    <Glass className="p-5 mt-10 grow">
      <p className="text-[30px] leading-[35px]">{props.title}</p>
      <BaseHDivider className="mt-5" />
      {props.children}
    </Glass>
  );
}

export function NoteGlass(props: NoteGlassProps) {


  const groupedData: Record<string, Item[]> = props.lead?.data.reduce((result: Record<string, Item[]>, item: Item) => {
    const { category } = item;
    if (!result[category]) {
      result[category] = [];
    }
    result[category].push(item);
    return result;
  }, {}) || {};
  

  return (
    <ClientDetailGlass title={props.title}>


      <p className="text-base mt-5 mb-5">{props.note}</p>
      {Object?.entries(groupedData).map(([category, items]) => (
        <div key={category} className="mb-[30px]">
          <h3><b>{category}</b> </h3>
          <ul>
            {items.map((item: { question: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; answer: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }, index: Key | null | undefined) => (
              <li key={index} className="mb-[10px]">
                <p>Question: {item.question}</p>
                <p className="text-[blue]">Answer: {item.answer}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </ClientDetailGlass>
  );
}

export function BriefGlass(props: NoteGlassProps) {
  const [answerId, setAnswerId] = useState("")
  const [answer, setAnswer] = useState("")
  const [modalCOpen, setModalCOpen] = useState(false)
  
  const groupedData: Record<string, Item[]> = props.lead?.data?.reduce((result: Record<string, Item[]>, item: Item) => {
    const { category } = item;
    if (!result[category]) {
      result[category] = [];
    }
    result[category].push(item);
    return result;
  }, {}) || {};
  

  return (
    <ClientDetailGlass title={props.title}>

      <EditOnBoardingAnswer
        open={modalCOpen}
        handleClose={() => setModalCOpen(false)}
        answerId={answerId}
        answer={answer}
        onboardingId={props.lead?.id}
        leadId={props?.lead?.lead?.id}
      />
      <p className="text-base mt-5 mb-5">{props.note}</p>
      {Object?.entries(groupedData).map(([category, items]) => (
        <div key={category} className="mb-[30px]">
          <h3><b>{category}</b> </h3>
          <ul>
            {items.map((item: { question: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; answer: string ;id: string }, index: Key | null | undefined, ) => (
              <li key={index} className="mb-[10px]">
               
                <p>Question: {item.question}</p>
                <div className="flex items-center gap-4">
                  <p className="text-[gold]">Answer: {item.answer}</p> 
                  {/* <Pen size={32} /> */}
                
                <div style={{color:"white"}} onClick={()=> {setAnswerId(item.id); setAnswer(item.answer); setModalCOpen(true)}}><AiOutlineEdit/></div>
                </div>
               
              </li>
            ))}
          </ul>
        </div>
      ))}
    </ClientDetailGlass>
  );
}

export function Team(props: { data: MinimalUser[]; name: string }) {
  return (
    <ClientDetailGlass title={`Equipe - ${props.name}`}>
      {console.log(props,'propsprossps')
      }
      <div className="text-[white]">lllslslsl
      dddd
      </div>
      
      {props.data.length > 0 ? (
        <div className="w-fit flex flex-col items-stretch">
          <div className="flex justify-between gap-[200px] mt-5">
            <p className="text-base">Profile</p>
            <p className="text-base">Statut</p>
          </div>

          {/* Team list */}
          {props.data.map((u) => (
            <div className="flex items-center mt-5" key={u.id}>
              <Image
                src={u.profileImageUrl || "/images/profilecompany2.png"}
                height={50}
                width={50}
                alt="avatar"
                className="rounded-full"
              />
              <div className="grow ml-5">
                <p className="text-base">{getUserName(u)}</p>
                <p className="text-[13px] leading-[19px] whitespace-nowrap text-ellipsis">
                  {u.baseUser.email}
                </p>
              </div>
              <Tag>Actif</Tag>
            </div>
          ))}
        </div>
      ) : (
        <p
          className={`text-base text-subtitle text-center ${utilStyles.absoluteCentered}`}
        >
          Aucun membre de l&apos;équipe n&apos;a été attaché à ce client
        </p>
      )}
    </ClientDetailGlass>
  );
}
