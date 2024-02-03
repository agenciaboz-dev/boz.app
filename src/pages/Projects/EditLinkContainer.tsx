import React from "react"
import { Grid, IconButton } from "@mui/material"
import { TaiTextField } from "../../components/TaiTextField"
import { FormikErrors } from "formik"
import { AddCircle, Cancel } from "@mui/icons-material"

interface EditLinkProps {
    formik: {
        values: NewProjectForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<NewProjectForm>>
    }
    index: number
    link: LinkForm
}

export const EditLink: React.FC<EditLinkProps> = ({ formik, index, link }) => {
    const removeLink = () => {
        const links = formik.values.links.filter((item) => item != link)
        formik.setFieldValue("links", links)
    }

    const addLink = () => {
        const links = formik.values.links
        formik.setFieldValue("links", [...links, { name: "", url: "" }])
    }

    return (
        <>
            <Grid item xs={6}>
                <TaiTextField
                    label={`link ${index + 1}`}
                    name={`links[${index}].name`}
                    value={link.name}
                    onChange={formik.handleChange}
                    placeholder="Briefing"
                    InputProps={{
                        startAdornment: !!index ? (
                            <IconButton onClick={removeLink} color="inherit">
                                <Cancel />
                            </IconButton>
                        ) : null,
                    }}
                />
            </Grid>
            <Grid item xs={6}>
                <TaiTextField
                    label={`url`}
                    name={`links[${index}].url`}
                    value={link.url}
                    onChange={formik.handleChange}
                    InputProps={{
                        endAdornment:
                            index == formik.values.links.length - 1 ? (
                                <IconButton onClick={addLink} color="inherit">
                                    <AddCircle />
                                </IconButton>
                            ) : null,
                    }}
                />
            </Grid>
        </>
    )
}
