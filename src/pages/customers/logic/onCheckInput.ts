const onCheck = (
  e: React.FormEvent<HTMLInputElement>,
  id: number,
  setIds: React.Dispatch<React.SetStateAction<number[]>>
) => {
  const target = e.target as typeof e.target & {
    checked: boolean
  }
  if (target.checked) {
    setIds((arrayIds) => {
      if (!arrayIds.includes(id)) {
        return [...arrayIds, id]
      } else return arrayIds
    })
  } else {
    setIds((arrayIds) => {
      return arrayIds.filter((element) => element !== id)
    })
  }
}

export default onCheck
