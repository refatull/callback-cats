import React from "react";

export default function CatInfoCard(props: any) {
  return (
    <>
      <div>
        <img
          className="rounded-sm h-[250px] object-cover object-center w-full"
          src={props.cat.img_url}
          alt={props.cat.img_url}
        />
        <div className="my-3 w-90%">
          <div>
            <article>
              <strong>Name : </strong>
              {props.cat.name}
            </article>
            <article>
              <strong>Age : </strong>
              {props.cat.age}
            </article>
            <article>
              <strong>Breed : </strong>
              {props.cat.breed}
            </article>
            <article>
              <strong>Gender : </strong>
              {props.cat.gender}
            </article>
            <article>
              <strong>Is it available? : </strong>
              {props.cat.is_available ? <>Yes</> : <>No</>}
            </article>
            <article>
              <strong>Description : </strong>
              <>{props.cat.description}</>
            </article>
            <div className=""></div>
          </div>
        </div>
      </div>
    </>
  );
}
