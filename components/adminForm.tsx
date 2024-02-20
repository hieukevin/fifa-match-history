"use client";
import { createMatch } from "@/libs/_action";
import { teamStats } from "@/models/models";
import { Autocomplete, TextField } from "@mui/material";
import { InferSchemaType } from "mongoose";
import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

const initialState = {
  message: "",
  errors: undefined,
  fieldValue: {
    hieu_score: 0,
    kuba_score: 0,
    hieu_team: "",
    kuba_team: "",
    datePlayed: new Date().toISOString().split("T")[0],
  },
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Submit Match
    </button>
  );
}

export default function AdminForm({
  teams1,
  teams2,
}: {
  teams1: InferSchemaType<typeof teamStats>[];
  teams2: InferSchemaType<typeof teamStats>[];
}) {
  const [state, formAction] = useFormState(createMatch, initialState);
  const [kubaTeam, setKubaTeam] = React.useState("");
  const [hieuTeam, sethieuTeam] = React.useState("");
  const formRef = React.useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.message === "success") {
      formRef.current?.reset();
      console.log("success");
    }
  }, [state]);

  return (
    <form
      action={formAction}
      ref={formRef}
      className="flex flex-col lg:mx-52 mx-4  gap-7 text-black p-10 rounded-lg shadow-lg z-10 relative bg-white bg-opacity-90"
    >
      <div className="flex gap-5 ">
        <label className="flex flex-col sm:w-1/3" htmlFor="hieu_score">
          Hieu's score:
          <TextField
            type="number"
            id="hieu_score"
            name="hieu_score"
            placeholder="Goals"
            variant="outlined"
          />
          <span className="text-red-400 text-sm">
            {state?.errors?.hieu_score}
          </span>
        </label>
        <label className="flex flex-col w-full" htmlFor="hieu_team">
          Hieu's Team:
          <input type="hidden" name="hieu_team" value={hieuTeam} />
          <Autocomplete
            id="hieu_team"
            freeSolo
            onInputChange={(event, newInputValue) => {
              sethieuTeam(newInputValue);
            }}
            options={teams1.map((option) => option.team)}
            renderInput={(params) => <TextField {...params} />}
          />
          <span className="text-red-400 text-sm">
            {state?.errors?.hieu_team}
          </span>
        </label>
      </div>

      <div className="flex gap-5">
        <label className="flex flex-col sm:w-1/3" htmlFor="kuba_score">
          Kuba's score:
          <TextField
            type="number"
            id="kuba_score"
            name="kuba_score"
            placeholder="Goals"
            variant="outlined"
          />
          <span className="text-red-400 text-sm">
            {state?.errors?.kuba_score}
          </span>
        </label>

        <label className="flex flex-col w-full" htmlFor="kuba_team">
          Kuba's Team:
          <input type="hidden" name="kuba_team" value={kubaTeam} />
          <Autocomplete
            id="kuba_team"
            freeSolo
            onInputChange={(event, newInputValue) => {
              setKubaTeam(newInputValue);
            }}
            options={teams2.map((option) => option.team)}
            renderInput={(params) => <TextField {...params} />}
          />
          <span className="text-red-400 text-sm">
            {state?.errors?.kuba_team}
          </span>
        </label>
      </div>

      <label className="flex flex-col" htmlFor="datePlayed">
        Date Played:
        <input
          type="date"
          name="datePlayed"
          defaultValue={new Date().toISOString().split("T")[0]}
          className="border border-gray-300"
        />
      </label>
      <SubmitButton />
      {state?.message === "success" && (
        <p className=" font-semibol text-2xl text-green-500">
          Match submitted successfully
        </p>
      )}
    </form>
  );
}
