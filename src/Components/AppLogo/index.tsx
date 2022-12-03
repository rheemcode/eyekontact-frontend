
declare interface AppLogoProps {
    icon: string
}

const AppLogo: React.FC<AppLogoProps> = (props) => {
    return (
        <div className="app-logo flex items-center gap-2">
            <img className="h-8 w-auto sm:h-10" src={props.icon} alt="" />
            <span className="text-xl font-bold text-e_blue ">
                Eyekontact
            </span>
        </div>
    )
}

export default AppLogo;