import React from "react";
import {Divider, IconButton, Menu} from "react-native-paper";

const SortComponent = ({updateSort}) => {
    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const handleMenuClick = (by, direction) => {
        updateSort({
            sortBy: by,
            direction: direction
        });
        closeMenu();
    }

    return (
        <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
                    <IconButton
                        onPress={openMenu}
                        icon="sort"
                        color="#000"
                        size={28}
                    />
                }>
            <Menu.Item onPress={() => {handleMenuClick('price', 'asc')}} title="Preis aufsteigend" />
            <Menu.Item onPress={() => {handleMenuClick('price', 'desc')}} title="Preis absteigend" />
            <Divider />
            <Menu.Item onPress={() => {handleMenuClick('category', 'asc')}} title="Kategorie aufsteigend" />
            <Menu.Item onPress={() => {handleMenuClick('category', 'desc')}} title="Kategorie absteigend" />

        </Menu>
    )
}
export default SortComponent;