#!/usr/bin/env bash

OUTPUT_FILE=${1:-./env-config.js}
FOR_ENV=${ENV:-local}
INPUT_FILE=".env.${FOR_ENV}"

if [[ ! -e ${INPUT_FILE} ]]; then
  echo "${INPUT_FILE} is missing. Using .env.docker"
  INPUT_FILE=.env.docker
fi

# Recreate config file
rm -f "${OUTPUT_FILE}"

# Add assignment
echo "window.__ENV = {ENV: \"$FOR_ENV\"," > "${OUTPUT_FILE}"

# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [[ -n "$line" ]];
do
  # skip comments
  if printf '%s\n' "$line" | grep -q -e '^\s*#'; then
    continue
  fi

  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  # empty $varname should be skipped
  if [[ "x${varname}" == "x" ]]; then
    continue
  fi

  # Read value of current variable if exists as Environment variable
  value=$(printf '%s\n' "${!varname}")
  # Otherwise use value from .env file
  [[ -z $value ]] && value=${varvalue}

  # Append configuration property to JS file
  echo "  $varname: \"$value\"," >> "${OUTPUT_FILE}"
done < "${INPUT_FILE}"

echo "};document.title=window.__ENV.APPLICATION_NAME+' ['+window.__ENV.ENV.toUpperCase()+']';" >> "${OUTPUT_FILE}"
