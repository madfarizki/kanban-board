import {
    Header,
    HeaderText,
    GroupLabel,
    BoxContainer,
    GroupDesc,
    BoxItem,
    ItemName,
    BorderLine,
    ProgressBar,
    Setting, SettingMenu, NewItemButton
} from "../components";
import { groups, items } from "../constants";
import { BiTrash, BiEditAlt } from "react-icons/bi"
import { FiArrowRight, FiArrowLeft } from "react-icons/fi"

export default function Home() {
    return (
        <>
            <section>
                <Header>
                    <HeaderText>Product Roadmap</HeaderText>
                </Header>
            </section>

            <section className="main">
                {groups.map((item, index) => {
                    const itemTask = items[item.id];
                    console.log(itemTask)
                    return (
                       <BoxContainer color="primary" key={item.id}>
                           <GroupLabel color="primary">{item.title}</GroupLabel>
                           <GroupDesc>{item.description}</GroupDesc>
                           {itemTask && itemTask.length > 0  ? (
                               itemTask.map((task, index) => (
                                <BoxItem key={index}>
                                    <ItemName>{task.name}</ItemName>
                                    <BorderLine/>
                                    <div className="container">
                                        <div style={{ width: "100%" }}>
                                            <ProgressBar progress={task.progress_percentage} />
                                        </div>
                                        <Setting>
                                            <div>
                                                <SettingMenu color="primary" icon={<FiArrowRight/>}>
                                                    Move Right
                                                </SettingMenu>
                                                <SettingMenu color="primary" icon={<FiArrowLeft/>}>
                                                    Move Left
                                                </SettingMenu>
                                                <SettingMenu color="primary" icon={<BiEditAlt/>}>
                                                    Edit
                                                </SettingMenu>
                                                <SettingMenu color="danger" icon={<BiTrash/>}>
                                                    Delete
                                                </SettingMenu>
                                            </div>
                                        </Setting>
                                    </div>
                                </BoxItem>
                               ))
                           ) : (
                               <BoxItem>No Task</BoxItem>
                           )}

                           <NewItemButton>
                               New Task
                           </NewItemButton>
                       </BoxContainer>
                    )
                })}
            </section>

        </>
    )
}