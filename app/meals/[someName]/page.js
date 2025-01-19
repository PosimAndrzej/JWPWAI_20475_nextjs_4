import { getMeal } from "@/lib/meals";
import classes from './page.module.css'
import Image from "next/image";

export default function MealDetailsPage({params}){
  const meal = getMeal(params.someName);
  if (!meal) {
    return <p className={classes.loading}>Loading meal details...</p>;
  }

  const instructionsList = meal.instructions.split('\n').filter(line => line.trim() !== '');
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            src={meal.image}
            alt={meal.title}
            fill
          />
        </div>
        <div>
          <div className={classes.headerText}>
            <h1>{meal.title}</h1>
            <div className={classes.summary}>
              {meal.summary}
            </div>
            <div className={classes.creator}>
              <p>
                <strong>Creator:</strong> {meal.creator}
              </p>
              <p>
                <strong>Contact:</strong>{" "}
                <a href={`mailto:${meal.creator_email}`}>
                  {meal.creator_email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className={classes.instructions}>
          <h2>Instructions:</h2>
          
            {instructionsList.map((instruction, index) => (
              <p key={index}>{instruction.trim()}</p>
            ))}
          
        </div>
       
      </main>
    </>
  );
}