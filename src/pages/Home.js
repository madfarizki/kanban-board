import {Header, HeaderText, GroupLabel, BoxContainer, GroupDesc, BoxItem, ItemName} from "../components";
import { groups, items } from "../constants";

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
                                </BoxItem>
                               ))
                           ) : (
                               <BoxItem>No Task</BoxItem>
                           )}
                       </BoxContainer>
                    )
                })}
            </section>

        </>
    )
}