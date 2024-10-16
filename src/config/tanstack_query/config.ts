/* For Get methods use useQuery, for Post, Update, Delete use useMutation

   ***useQuery
   const {data, isSuccess, isPending, isError, error, isFetching} = useQuery({queryKey: ["key"], queryFn: callback})

   ***useMutation
   const mutation = useMutation({mutationFn: (parameter) =>{}})

   Mutations doesn't have caching, in order to cache you have to add:
     onSuccess: (data) => {
    // Manually set the query data for a specific key
    queryClient.setQueryData(['dataKey'], data);

    to call mutation function in your app you have to do:
    mutation.mutate(parameter)
  },

*/

import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();
