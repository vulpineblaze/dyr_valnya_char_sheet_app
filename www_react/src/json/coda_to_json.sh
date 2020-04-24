
export TOKEN="d849acc0-66e6-4f17-8405-5e0a85cf7833"
export DOC="55_RuUt6nh"

export TABLE="grid-sFVbFfjLoX"

curl -s -H 'Authorization: Bearer $TOKEN' \
   'https://coda.io/apis/v1beta1/docs/$DOC/tables/$TABLE/rows'

