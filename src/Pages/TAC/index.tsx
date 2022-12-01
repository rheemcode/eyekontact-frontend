import PageLoading from "../../Components/Loader";
import PageBanner from "../../Components/PageBanner";
import { useAppSelector } from "../../hooks";

const TACSection = () => {

    const pageContent = useAppSelector((state) => state.pageContent.webPagesState.tac)

    return (
        <div className="tac py-12 px-8" dangerouslySetInnerHTML={{ __html: pageContent }} />
    )
}

const TAC = () => {
    return (
        <div>

            <PageBanner title="Terms and Condition" path="Terms and Condition" image={""} />
            <TACSection />
        </div >
    )
}

export default TAC;