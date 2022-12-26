import {
    // useCallback,
    useEffect,
    // useState
} from 'react'
import {
    // useDispatch,
    useSelector,
} from 'react-redux'
import {addUser, fetchUsers} from '../store'
import Skeleton from './Skeleton'
import Button from './Button'
import {useThunk} from '../hooks/use-thunk'
import UsersListItem from './UsersListItem'

function UsersList() {
    // Handling loading state without using a custom hook.
    // const [isLoadingUsers, setIsLoadingUsers] = useState(false)
    // const [loadingUsersError, setLoadingUsersError] = useState(null)
    // const [isCreatingUser, setIscreatingUser] = useState(false)
    // const [creatingUserError, setCreatingUserError] = useState(null)
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     setIsLoadingUsers(true)
    //     dispatch(fetchUsers())
    //         .unwrap()
    //         .catch((err) => setLoadingUsersError(err))
    //         .finally(() => setIsLoadingUsers(false))
    // }, [dispatch])

    // const handleUserAdd = () => {
    //     setIscreatingUser(true)
    //     dispatch(addUser())
    //         .unwrap()
    //         .catch((err) => setCreatingUserError(err))
    //         .finally(() => setIscreatingUser(false))
    // }
    //handling loding state with custom hook.
    const [doFetchUsers, isLoadingUsers, loadingUsersError] =
        useThunk(fetchUsers)
    const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser)

    const {data} = useSelector((state) => {
        return state.users
    })

    useEffect(() => {
        doFetchUsers()
    }, [doFetchUsers])

    const handleUserAdd = () => {
        doCreateUser()
    }

    let content
    if (isLoadingUsers) {
        content = <Skeleton times={6} className="h-10 w-full" />
    } else if (loadingUsersError) {
        content = <div>Error fetching data...</div>
    } else {
        content = data.map((user) => {
            return <UsersListItem key={user.id} user={user} />
        })
    }

    return (
        <div>
            <div className="flex flex-row justify-between items-center m-3">
                <h1 className="m-2 text-xl">Users</h1>
                <Button loading={isCreatingUser} onClick={handleUserAdd}>
                    + Add User
                </Button>
                {creatingUserError && 'Error creating user...'}
            </div>
            {content}
        </div>
    )
}

export default UsersList
